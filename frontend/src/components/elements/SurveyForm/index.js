import React, { useState } from "react"
import styled from "styled-components"

import { API, returnData } from "../../../API"

import {
  Color,
  Grid,
  Col,
  Input,
  Margin,
  Form,
  Select,
  Checkbox,
  AlignRight,
  Query,
  AlignCenter,
  Mutation,
  ErrorAlert,
} from "../../utilities"
import { Button } from "../Button"
import { SurveyResults } from "../SurveyResults"

const FormWrapper = styled.div`
  h2 {
    text-align: center;
    color: ${Color.red};
  }
`

const ageGroups = [
  {
    label: ``,
    value: null,
  },
  {
    label: `6-12`,
  },
  {
    label: `13-17`,
  },
  {
    label: `18-24`,
  },
  {
    label: `25-34`,
  },
  {
    label: `35-44`,
  },
  {
    label: `45-54`,
  },
  {
    label: `55-64`,
  },
  {
    label: `65+`,
  },
]

const inputs = {
  email: "",
  age_group: "",
  resident: "",
  archery: false,
  badminton: false,
  barre: false,
  bowling: false,
  "cross-fit": false,
  cycling_road: false,
  cycling_stationary: false,
  cycling_mountain: false,
  dance: false,
  fishing: false,
  free_weights: false,
  golfing: false,
  hiking: false,
  horseback_riding: false,
  hunting: false,
  kickboxing: false,
  elliptical: false,
  rowing_erg: false,
  stair_climbing: false,
  treadmill: false,
  "weight-resistance": false,
  martial_arts: false,
  mountain_climbing: false,
  pilates: false,
  racquetball: false,
  roller_skating: false,
  running: false,
  skateboarding: false,
  swimming: false,
  tai_chi: false,
  walking: false,
  yoga: false,
  canoeing: false,
  diving: false,
  kayaking: false,
  paddle_boarding: false,
  rowing: false,
  sailing: false,
  scuba_diving: false,
  surfing: false,
  water_skiing: false,
  "cross-country_skiing": false,
  ice_skating: false,
  skiing: false,
  snowboarding: false,
  other_activity: "",
  baseball: false,
  basketball: false,
  cheerleading: false,
  crew: false,
  field_hockey: false,
  gymnastics: false,
  hockey: false,
  lacrosse: false,
  rugby: false,
  soccer: false,
  softball: false,
  tennis: false,
  volleyball: false,
  water_polo: false,
  wrestling: false,
  other_team_sport: "",
}

const SubSection = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding: 1rem 2.5rem;
  border-bottom: ${Color.grey} solid 1px;
  border-top: ${Color.grey} solid 1px;
`

const addSurvey = data => API.post(`/survey`, { ...data }).then(returnData)

const postSubmit = ({ setState }) => {
  setState({
    submitted: true,
  })
}

export const SurveyForm = () => {
  const [state, setState] = useState({
    submitted: false,
  })

  return (
    <FormWrapper>
      <h2>What Do You Do To Stay Fit?</h2>
      <em>
        Fill out the form below. The fields below marked with * are required
      </em>
      <Margin modifiers="mt2">
        <Mutation
          mutation={addSurvey}
          postFunc={() => postSubmit({ setState })}
        >
          {(addSurvey, { loading, error }) => (
            <>
              <SurveyResults />
              <Form
                state={inputs}
                required={["email", "age_group", "resident"]}
                reduceState={false}
                onSubmit={data => addSurvey(data)}
              >
                {({ handleChange, state, isInvalid }) => (
                  <>
                    <Grid modifiers={["gap", "thirds"]}>
                      <Col>
                        <Input
                          name="email"
                          type="email"
                          value={state.email}
                          onChange={handleChange}
                        >
                          Email *
                        </Input>
                      </Col>
                      <Col>
                        <Select
                          name="age_group"
                          options={ageGroups}
                          value={state.age_group}
                          onChange={handleChange}
                        >
                          Age Group *
                        </Select>
                      </Col>
                      <Col>
                        <Input
                          name="resident"
                          value={state.resident}
                          onChange={handleChange}
                        >
                          Resident Of *
                        </Input>
                      </Col>
                    </Grid>
                    <Margin modifiers="mt3">
                      <h3>Fitness Activities</h3>
                      <Grid modifiers="gap">
                        <Col>
                          <Checkbox
                            name="archery"
                            checked={state.archery}
                            onChange={handleChange}
                          >
                            Archery
                          </Checkbox>
                          <Checkbox
                            name="badminton"
                            checked={state.badminton}
                            onChange={handleChange}
                          >
                            Badminton
                          </Checkbox>
                          <Checkbox
                            name="barre"
                            checked={state.barre}
                            onChange={handleChange}
                          >
                            Barre
                          </Checkbox>
                          <Checkbox
                            name="bowling"
                            checked={state.bowling}
                            onChange={handleChange}
                          >
                            Bowling
                          </Checkbox>
                          <Checkbox
                            name="boxing"
                            checked={state.boxing}
                            onChange={handleChange}
                          >
                            Boxing
                          </Checkbox>
                          <Checkbox
                            name="cross-fit"
                            checked={state["cross-fit"]}
                            onChange={handleChange}
                          >
                            Cross-Fit
                          </Checkbox>

                          <SubSection>
                            <h5>Cycling</h5>
                            <Checkbox
                              name="cycling_road"
                              checked={state.cycling_road}
                              onChange={handleChange}
                            >
                              Road
                            </Checkbox>
                            <Checkbox
                              name="cycling_stationary"
                              checked={state.cycling_stationary}
                              onChange={handleChange}
                            >
                              Stationary
                            </Checkbox>
                            <Checkbox
                              name="cycling_mountain"
                              checked={state.cycling_mountain}
                              onChange={handleChange}
                            >
                              Mountain
                            </Checkbox>
                          </SubSection>

                          <Checkbox
                            name="dance"
                            checked={state.dance}
                            onChange={handleChange}
                          >
                            Dance
                          </Checkbox>
                          <Checkbox
                            name="boxing"
                            checked={state.fishing}
                            onChange={handleChange}
                          >
                            Fishing
                          </Checkbox>
                          <Checkbox
                            name="free_weights"
                            checked={state.free_weights}
                            onChange={handleChange}
                          >
                            Free Weights
                          </Checkbox>
                          <Checkbox
                            name="golfing"
                            checked={state.golfing}
                            onChange={handleChange}
                          >
                            Golfing
                          </Checkbox>
                          <Checkbox
                            name="hiking"
                            checked={state.hiking}
                            onChange={handleChange}
                          >
                            Hiking
                          </Checkbox>
                          <Checkbox
                            name="horseback_riding"
                            checked={state.horseback_riding}
                            onChange={handleChange}
                          >
                            Houseback Riding
                          </Checkbox>
                          <Checkbox
                            name="hunting"
                            checked={state.hunting}
                            onChange={handleChange}
                          >
                            Hunting
                          </Checkbox>
                          <Checkbox
                            name="kickboxing"
                            checked={state.kickboxing}
                            onChange={handleChange}
                          >
                            Kickboxing
                          </Checkbox>

                          <SubSection>
                            <h5>Machine</h5>
                            <Checkbox
                              name="elliptical"
                              checked={state.elliptical}
                              onChange={handleChange}
                            >
                              Elliptical
                            </Checkbox>
                            <Checkbox
                              name="rowing_erg"
                              checked={state.rowing_erg}
                              onChange={handleChange}
                            >
                              Rowing/Erg Machine
                            </Checkbox>
                            <Checkbox
                              name="stair_climbing"
                              checked={state.stair_climbing}
                              onChange={handleChange}
                            >
                              Stair Climbing
                            </Checkbox>
                            <Checkbox
                              name="treadmill"
                              checked={state.treadmill}
                              onChange={handleChange}
                            >
                              Treadmill
                            </Checkbox>
                            <Checkbox
                              name="weight-resistance"
                              checked={state["weight-resistance"]}
                              onChange={handleChange}
                            >
                              Weight-Resistance
                            </Checkbox>
                          </SubSection>

                          <Checkbox
                            name="martial_arts"
                            checked={state.martial_arts}
                            onChange={handleChange}
                          >
                            Martial Arts
                          </Checkbox>

                          <Checkbox
                            name="mountain_climbing"
                            checked={state.mountain_climbing}
                            onChange={handleChange}
                          >
                            Mountain Climbing
                          </Checkbox>

                          <Checkbox
                            name="pilates"
                            checked={state.pilates}
                            onChange={handleChange}
                          >
                            Pilates
                          </Checkbox>

                          <Checkbox
                            name="racquetball"
                            checked={state.racquetball}
                            onChange={handleChange}
                          >
                            Racquetball
                          </Checkbox>

                          <Checkbox
                            name="roller_skating"
                            checked={state.roller_skating}
                            onChange={handleChange}
                          >
                            Roller Skating
                          </Checkbox>

                          <Checkbox
                            name="running"
                            checked={state.running}
                            onChange={handleChange}
                          >
                            Running
                          </Checkbox>

                          <Checkbox
                            name="skateboarding"
                            checked={state.skateboarding}
                            onChange={handleChange}
                          >
                            Skateboarding
                          </Checkbox>

                          <Checkbox
                            name="swimming"
                            checked={state.swimming}
                            onChange={handleChange}
                          >
                            Swimming
                          </Checkbox>

                          <Checkbox
                            name="tai_chi"
                            checked={state.tai_chi}
                            onChange={handleChange}
                          >
                            Tai Chi
                          </Checkbox>

                          <Checkbox
                            name="Walking"
                            checked={state.walking}
                            onChange={handleChange}
                          >
                            Walking
                          </Checkbox>

                          <Checkbox
                            name="yoga"
                            checked={state.yoga}
                            onChange={handleChange}
                          >
                            Yoga
                          </Checkbox>
                        </Col>
                        <Col>
                          <SubSection>
                            <h5>Water Activity</h5>
                            <Checkbox
                              name="canoeing"
                              checked={state.canoeing}
                              onChange={handleChange}
                            >
                              Canoeing
                            </Checkbox>
                            <Checkbox
                              name="diving"
                              checked={state.diving}
                              onChange={handleChange}
                            >
                              Diving
                            </Checkbox>
                            <Checkbox
                              name="kayaking"
                              checked={state.kayaking}
                              onChange={handleChange}
                            >
                              Kayaking
                            </Checkbox>
                            <Checkbox
                              name="paddle_boarding"
                              checked={state.paddle_boarding}
                              onChange={handleChange}
                            >
                              Paddle Boarding
                            </Checkbox>
                            <Checkbox
                              name="rowing"
                              checked={state.rowing}
                              onChange={handleChange}
                            >
                              Rowing
                            </Checkbox>
                            <Checkbox
                              name="sailing"
                              checked={state.sailing}
                              onChange={handleChange}
                            >
                              Sailing
                            </Checkbox>
                            <Checkbox
                              name="scuba_diving"
                              checked={state.scuba_diving}
                              onChange={handleChange}
                            >
                              Scuba Diving
                            </Checkbox>
                            <Checkbox
                              name="surfing"
                              checked={state.surfing}
                              onChange={handleChange}
                            >
                              Surfing
                            </Checkbox>
                            <Checkbox
                              name="water_skiing"
                              checked={state.water_skiing}
                              onChange={handleChange}
                            >
                              Water Skiing
                            </Checkbox>

                            <Margin modifiers="mt4">
                              <h5>Winter Activity</h5>
                            </Margin>
                            <Checkbox
                              name="cross-country_skiing"
                              checked={state["cross-country_skiing"]}
                              onChange={handleChange}
                            >
                              Cross-Country Skiing
                            </Checkbox>
                            <Checkbox
                              name="ice_skating"
                              checked={state.ice_skating}
                              onChange={handleChange}
                            >
                              Ice Skating
                            </Checkbox>
                            <Checkbox
                              name="skiing"
                              checked={state.skiing}
                              onChange={handleChange}
                            >
                              Skiing
                            </Checkbox>
                            <Checkbox
                              name="snowboarding"
                              checked={state.snowboarding}
                              onChange={handleChange}
                            >
                              Snowboarding
                            </Checkbox>
                          </SubSection>
                          <Input
                            name="other_activity"
                            value={state.other_activity}
                            onChange={handleChange}
                          >
                            Other Activity
                          </Input>

                          <Margin modifiers="mt4">
                            <h3>Team Sports</h3>
                          </Margin>
                          <Checkbox
                            name="baseball"
                            checked={state.baseball}
                            onChange={handleChange}
                          >
                            Baseball
                          </Checkbox>
                          <Checkbox
                            name="basketball"
                            checked={state.basketball}
                            onChange={handleChange}
                          >
                            Basketball
                          </Checkbox>
                          <Checkbox
                            name="cheerleading"
                            checked={state.cheerleading}
                            onChange={handleChange}
                          >
                            Cheerleading
                          </Checkbox>
                          <Checkbox
                            name="crew"
                            checked={state.crew}
                            onChange={handleChange}
                          >
                            Crew
                          </Checkbox>
                          <Checkbox
                            name="field_hockey"
                            checked={state.field_hockey}
                            onChange={handleChange}
                          >
                            Field Hockey
                          </Checkbox>
                          <Checkbox
                            name="gymnastics"
                            checked={state.gymnastics}
                            onChange={handleChange}
                          >
                            Gymnastics
                          </Checkbox>
                          <Checkbox
                            name="hockey"
                            checked={state.hockey}
                            onChange={handleChange}
                          >
                            Hockey
                          </Checkbox>
                          <Checkbox
                            name="lacrosse"
                            checked={state.lacrosse}
                            onChange={handleChange}
                          >
                            Lacrosse
                          </Checkbox>
                          <Checkbox
                            name="rugby"
                            checked={state.rugby}
                            onChange={handleChange}
                          >
                            Rugby
                          </Checkbox>
                          <Checkbox
                            name="soccer"
                            checked={state.soccer}
                            onChange={handleChange}
                          >
                            Soccer
                          </Checkbox>
                          <Checkbox
                            name="softball"
                            checked={state.softball}
                            onChange={handleChange}
                          >
                            Softball
                          </Checkbox>
                          <Checkbox
                            name="tennis"
                            checked={state.tennis}
                            onChange={handleChange}
                          >
                            Tennis
                          </Checkbox>
                          <Checkbox
                            name="volleyball"
                            checked={state.volleyball}
                            onChange={handleChange}
                          >
                            Volleyball
                          </Checkbox>
                          <Checkbox
                            name="water_polo"
                            checked={state.water_polo}
                            onChange={handleChange}
                          >
                            Water Polo
                          </Checkbox>
                          <Checkbox
                            name="wrestling"
                            checked={state.wrestling}
                            onChange={handleChange}
                          >
                            Wrestling
                          </Checkbox>
                          <Input
                            name="other_team_sport"
                            value={state.other_team_sport}
                            onChange={handleChange}
                          >
                            Other Team Sport
                          </Input>
                        </Col>
                      </Grid>
                      <Margin modifiers="mt4">
                        <AlignRight>
                          <Button
                            modifiers="red"
                            disabled={isInvalid || loading}
                          >
                            {loading ? `Loading...` : "Submit Survey"}
                          </Button>
                        </AlignRight>
                      </Margin>
                      {error && <ErrorAlert error={error} />}
                    </Margin>
                  </>
                )}
              </Form>
            </>
          )}
        </Mutation>
      </Margin>
    </FormWrapper>
  )
}
